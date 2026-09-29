#!/bin/bash

# Artsly Firebase Hosting Deployment Script

echo "========================================="
echo "Artsly Firebase Hosting Deployment"
echo "========================================="

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "Firebase CLI not found. Installing..."
    npm install -g firebase-tools
fi

# Navigate to frontend directory
cd Artsly

# Install dependencies if not already installed
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
fi

# Build the project
echo "Building frontend..."
npm run build

# Navigate back to root
cd ..

# Initialize Firebase if not already done
if [ ! -f "firebase.json" ]; then
    echo "Initializing Firebase project..."
    firebase init hosting
fi

# Deploy to Firebase Hosting
echo "Deploying to Firebase Hosting..."
firebase deploy --only hosting

echo "========================================="
echo "Deployment complete!"
echo "Your site is now live on Firebase Hosting"
echo "========================================="
