<?php

require_once __DIR__ . '/../config/db.php';

if ($requestUri === '/colors' && $requestMethod === 'GET') {
    $statement = $pdo->query(
        'SELECT id, name, red_value, green_value, blue_value, created_at
         FROM colors
         ORDER BY created_at DESC'
    );

    echo json_encode($statement->fetchAll());
    exit;
}

if ($requestUri === '/colors' && $requestMethod === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $name = trim($data['name'] ?? '');
    $red = $data['r'] ?? null;
    $green = $data['g'] ?? null;
    $blue = $data['b'] ?? null;

    if (
        $name === '' ||
        !is_int($red) ||
        !is_int($green) ||
        !is_int($blue) ||
        $red < 0 || $red > 255 ||
        $green < 0 || $green > 255 ||
        $blue < 0 || $blue > 255
    ) {
        http_response_code(400);

        echo json_encode([
            'error' => 'Invalid color data',
        ]);

        exit;
    }

    $statement = $pdo->prepare(
        'INSERT INTO colors (name, red_value, green_value, blue_value)
         VALUES (:name, :red, :green, :blue)'
    );

    $statement->execute([
        ':name' => $name,
        ':red' => $red,
        ':green' => $green,
        ':blue' => $blue,
    ]);

    http_response_code(201);

    echo json_encode([
        'id' => $pdo->lastInsertId(),
        'name' => $name,
        'red_value' => $red,
        'green_value' => $green,
        'blue_value' => $blue,
    ]);

    exit;
}

if (preg_match('#^/colors/(\d+)$#', $requestUri, $matches) && $requestMethod === 'DELETE') {
    $id = (int) $matches[1];

    $statement = $pdo->prepare('DELETE FROM colors WHERE id = :id');
    $statement->execute([':id' => $id]);

    echo json_encode([
        'success' => true,
    ]);

    exit;
}

http_response_code(404);

echo json_encode([
    'error' => 'Route not found',
]);