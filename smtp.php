<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Mailchimp API configuration
    $apiKey = '4fc092f61eada642ade0f02dded239b1-us15';
    $listId = '36d8321644';



    // Collect form data
    $email = $_POST['email']; // Capture email address
    $firstName = $_POST['firstName']; // Capture first name
    $lastName = $_POST['lastName']; // Capture last name
    $company = $_POST['company']; // Capture company name
    $jobRole = $_POST['jobRole']; // Capture job role
    $terms = isset($_POST['terms']) ? $_POST['terms'] : null; // Capture terms checkbox (on/off)
    $buttonName = $_POST['buttonName']; // Capture button name

    // Mailchimp API endpoint
    $dataCenter = substr($apiKey, strpos($apiKey, '-') + 1);
    $url = "https://$dataCenter.api.mailchimp.com/3.0/lists/$listId/members";

    // Data to send to Mailchimp
    $postData = [
        'email_address' => $email,
        'status' => 'subscribed', // Options: subscribed, pending, unsubscribed
        'merge_fields' => [
            'FNAME' => $firstName,
            'LNAME' => $lastName,
            'COMPANY' => $company, // Add company to merge fields
            'JOBROLE' => $jobRole, // Add job role to merge fields
        ]
    ];

    // cURL request to Mailchimp API
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_USERPWD, "anystring:$apiKey"); // Mailchimp API requires username:apiKey
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($postData));

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    // Check response
    if ($httpCode === 200) {
        echo json_encode(['status' => 'success', 'message' => 'User added to Mailchimp successfully.']);
    } else {
        $error = json_decode($response, true);
        echo json_encode(['status' => 'error', 'message' => $error['detail'] ?? 'An error occurred.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
}
