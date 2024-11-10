<?php
include 'connection.php';


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    
    $username = htmlspecialchars($data['username'] ?? '');
    $password = $data['password'] ?? '';

    if (empty($username) || empty($password)) {
        echo json_encode(['message' => 'Username and password are required']);
        http_response_code(400);
        exit;
    }

    try {
        $stmt = $pdo->prepare("SELECT * FROM users WHERE username = :username");
        $stmt->bindParam(':username', $username);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($password, $user['password_hash'])) {
            echo json_encode(['message' => 'Login successful!']);
            http_response_code(200);
        } else {
            echo json_encode(['message' => 'Invalid username or password']);
            http_response_code(401);
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