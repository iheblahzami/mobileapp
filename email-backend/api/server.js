require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

app.use(cors({
  origin: true ,
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());

// Health check routes
app.get("/", (req, res) => {
  res.json({ message: "Email backend server is running!" });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Enhanced email sender function with better error handling
const sendEmail = async (bookingDetails) => {
  const { name, need, address, date, profession } = bookingDetails;
  
  // Validate required environment variables
  if (!process.env.EMAIL || !process.env.EMAIL_PASSWORD || !process.env.RECEIVER_EMAIL) {
    throw new Error("Missing required environment variables");
  }
  
  // Configure nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  
  });
  
  // Test connection before sending
  await transporter.verify();
  
  // Clean and improved email template
  const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.RECEIVER_EMAIL,
    subject: `New Booking for ${profession}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #ffffff;">
        <h2 style="color: #4CAF50; text-align: center; margin-bottom: 30px; font-size: 24px;">
          📅 New Booking Received
        </h2>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <div style="margin-bottom: 15px;">
            <strong style="color: #333; display: inline-block; width: 100px;">👤 Name:</strong>
            <span style="color: #555;">${name}</span>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #333; display: inline-block; width: 100px;">💼 Service:</strong>
            <span style="color: #555;">${profession}</span>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #333; display: inline-block; width: 100px;">📝 Need:</strong>
            <span style="color: #555;">${need}</span>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #333; display: inline-block; width: 100px;">📍 Address:</strong>
            <span style="color: #555;">${address}</span>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #333; display: inline-block; width: 100px;">📅 Date:</strong>
            <span style="color: #555;">${date}</span>
          </div>
          
          <div style="margin-bottom: 0;">
            <strong style="color: #333; display: inline-block; width: 100px;">⏰ Submitted:</strong>
            <span style="color: #555;">${new Date().toLocaleString()}</span>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 30px;">
          <p style="color: #666; margin-bottom: 15px;">Please contact the customer to confirm the booking.</p>
        </div>
        
        <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px; text-align: center;">
          <p style="color: #888; font-size: 12px; margin: 0;">
            This email was sent from your booking system.
          </p>
        </div>
      </div>
    `,
  };
  
  // Send email and return result
  const result = await transporter.sendMail(mailOptions);
  return result;
};

// Enhanced API route with comprehensive error handling
app.post("/api/send-email", async (req, res) => {
  try {
    console.log("=== EMAIL SENDING REQUEST ===");
    console.log("Timestamp:", new Date().toISOString());
    console.log("Environment variables check:");
    console.log("EMAIL:", process.env.EMAIL ? "✓ Set" : "✗ Missing");
    console.log("EMAIL_PASSWORD:", process.env.EMAIL_PASSWORD ? "✓ Set" : "✗ Missing");
    console.log("RECEIVER_EMAIL:", process.env.RECEIVER_EMAIL ? "✓ Set" : "✗ Missing");
    console.log("Request body:", req.body);
    
    // Validate request body
    const { name, need, address, date, profession } = req.body;
    if (!name || !need || !address || !date || !profession) {
      return res.status(400).json({
        success: false,
        message: "Missing required booking details"
      });
    }
    
    // Send email
    const result = await sendEmail(req.body);
    
    console.log("✓ Email sent successfully:", result.messageId);
    res.status(200).json({
      success: true,
      message: "Email sent successfully",
      messageId: result.messageId
    });
    
  } catch (error) {
    console.error("✗ Email sending failed:", error.message);
    
    // Different error responses based on error type
    if (error.message.includes("Missing required environment variables")) {
      res.status(500).json({
        success: false,
        message: "Server configuration error"
      });
    } else if (error.message.includes("Invalid login") || error.message.includes("Authentication failed")) {
      res.status(500).json({
        success: false,
        message: "Email authentication failed"
      });
    } else if (error.message.includes("connection")) {
      res.status(500).json({
        success: false,
        message: "Email service connection failed"
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Failed to send email",
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📧 Email service configured: ${process.env.EMAIL ? '✓' : '✗'}`);
});

// Export for deployment platforms (Vercel, etc.)
module.exports = app;