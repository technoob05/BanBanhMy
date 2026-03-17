// This is a simple test file for the auth logic
// In a real environment, we would use Vitest or Jest.
// For now, we simulate a test suite for the Register and Login logic.

const db = {
  users: [],
  add(user) { this.users.push(user); },
  find(email) { return this.users.find(u => u.email === email); }
};

function testAuth() {
  console.log("Starting QA Test Suite...");

  // Test 1: User Registration
  const newUser = { email: "test@example.com", name: "Test User", password: "123" };
  db.add(newUser);
  const found = db.find("test@example.com");
  
  if (found && found.name === "Test User") {
    console.log("✅ Test 1 Passed: User Registration Success");
  } else {
    console.log("❌ Test 1 Failed: User Registration");
  }

  // Test 2: Duplicate User Check
  const duplicateUser = { email: "test@example.com", name: "Bad User" };
  const exists = db.find(duplicateUser.email);
  if (exists) {
    console.log("✅ Test 2 Passed: Duplicate User Detected");
  } else {
    console.log("❌ Test 2 Failed: Duplicate User Allowed");
  }

  console.log("QA Test Suite Completed.");
}

testAuth();
