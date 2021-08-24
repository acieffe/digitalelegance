<?php include('header.php');

// Here is the query needed for all data from the database tables.
$sql = "SELECT customers.customer_L_Name, customers.customer_F_Name, customers.customer_Title, customers.customer_Email, billing.customer_bill, billing.amt_paid FROM customers, billing WHERE customers.customer_ID = billing.customer_ID;";
$result = mysqli_query($conn, $sql);
$resultsCheck = mysqli_num_rows($result);

if($resultsCheck <= 0) {
    echo "There are no bills to process.";
} else {
    while ($row = mysqli_fetch_assoc($result)) {
        
        if ($row['customer_bill'] > $row['amt_paid']) { // if amount is due

            // the message
            $msg = "Dear " . $row['customer_Title'] . " " . $row['customer_F_Name'] . " " . $row['customer_L_Name'] . ":\n\nThank you for your patronage. It was our pleasure to serve you. Please be advised that there is still and outstanding balance on your account to the amount $" .  ($row['customer_bill'] - $row['amt_paid']) . ". Please contact our billing department at (509) 555-3486 or simply reply to this email. Thank you again and we hope to see you soon.";

            // if lines are longer than 80 characters
            $msg = wordwrap($msg,80);

            // send email
            mail($row['customer_Email'], "Please see the following amount due.", $msg);

            // print to screen of what was done
            echo "<p>Bill sent to " . $row['customer_Title'] . " " . $row['customer_F_Name'] . " " . $row['customer_L_Name'] . " at " . $row['customer_Email'] . " for $" .  ($row['customer_bill'] - $row['amt_paid']) . ".<br /></p>";
        } elseif ($row['customer_bill'] == $row['amt_paid']) { // if zero balance

            // the message
            $msg = "Dear " . $row['customer_Title'] . " " . $row['customer_F_Name'] . " " . $row['customer_L_Name'] . ":\n\nWe are grateful for your patronage. If you need any other services, please call us again and tell a friend.";

            // if lines are longer than 80 characters
            $msg = wordwrap($msg,80);

            // send email
            mail($row['customer_Email'], "We appreciate your business", $msg);

            // print to screen of what was done
            echo "<p>Email sent to " . $row['customer_Title'] . " " . $row['customer_F_Name'] . " " . $row['customer_L_Name'] . " at " . $row['customer_Email'] . " thanking them for business.<br /></p>";
        } else { // If a credit is on the account

            // the message
            $msg = "Dear " . $row['customer_Title'] . " " . $row['customer_F_Name'] . " " . $row['customer_L_Name'] . ":\n\nWe really enjoyed being able to serve you. According to our records it appears you have a credit to the amount of $" .  ($row['amt_paid'] - $row['customer_bill']) . ". We would love to see you soon to serve you better. Thank you again.";

            // if lines are longer than 80 characters
            $msg = wordwrap($msg,80);

            // send email
            mail($row['customer_Email'], "You have Store Credit!", $msg);

            // print to screen of what was done
            echo "<p>Email sent to " . $row['customer_Title'] . " " . $row['customer_F_Name'] . " " . $row['customer_L_Name'] . " at " . $row['customer_Email'] . " telling them of their credit of $" .  ($row['amt_paid'] - $row['customer_bill']) . ".<br /></p>";
        } 
    } 
}

include('footer.php') ?>