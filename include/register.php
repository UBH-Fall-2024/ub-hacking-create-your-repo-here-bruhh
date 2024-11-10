<?php
include 'connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $username = htmlspecialchars($data['username'] ?? '');
    $email = filter_var($data['email'] ?? '', FILTER_VALIDATE_EMAIL);
    $password = $data['password'] ?? '';

    if (empty($username) || empty($email) || empty($password)) {
        echo json_encode(['message' => 'All fields are required']);
        http_response_code(400);
        exit;
    }

    if (strpos($email, '@buffalo.edu') === false) {
        echo json_encode(['message' => 'Use @buffalo.edu email']);
        http_response_code(400);
        exit;
    }

    $passwordHash = password_hash($password, PASSWORD_BCRYPT);

    try {
        $stmt = $pdo->prepare("SELECT * FROM users WHERE email = :email");
        $stmt->bindParam(':email', $email);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            echo json_encode(['message' => 'Email is already registered']);
            http_response_code(400);
            exit;
        }

        $stmt = $pdo->prepare("INSERT INTO users (username, email, password_hash, status) VALUES (:username, :email, :password_hash, 'student')");
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password_hash', $passwordHash);

        if ($stmt->execute()) {
            echo json_encode(['message' => 'Registration Successful']);
            http_response_code(201);
        } else {
            echo json_encode(['message' => 'Registration Failed']);
            http_response_code(500);
        }
    } catch (PDOException $e) {
        echo json_encode(['message' => 'Database error: ' . $e->getMessage()]);
        http_response_code(500);
    }
} else {
    echo json_encode(['message' => 'Invalid request method']);
    http_response_code(405);
}
?>