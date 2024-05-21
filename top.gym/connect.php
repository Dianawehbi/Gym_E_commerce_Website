<?php

if ($_SERVER["REQUEST_METHOD"] == 'POST' && isset($_POST['signup'])) {
    $conn = mysqli_connect('localhost', 'root', '', 'projectweb') or die('Connection Failed' . mysqli_connect_error());;

    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $cpassword = $_POST['cpassword'];

    if ($password == $cpassword) {

        $sql = "INSERT INTO `signup` (`id`,`username`,`email`,`password` ) VALUES ('123','$username','$email', '$password' )";
        $query = mysqli_query($conn, $sql);

        if ($query) {
            echo "Data inserted succesfully";
            header("Location: index1.html");
        } else {
            echo "Data not inserted";
        }
    } else {
        echo "your password doent match !!";
    }

    mysqli_close($conn);
}

?>
<?php

if (isset($_POST["login"])) {
    $username1 = $_POST['username'];
    $password1 = $_POST['password'];

    $conn = mysqli_connect('localhost', 'root', '', 'projectweb')  or die('Connection Failed' . mysqli_connect_error());
    $sql = "SELECT * FROM `signup`";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {

        while ($row = mysqli_fetch_assoc($result)) {

            $username = $row['username'];
            $email = $row['email'];
            $password = $row['password'];
            echo "Username: $username, Email: $email, Password: $password <br>";

            if ($username1 == $username && $password1 ==  $password) {
                header("Location: index1.html");
                exit(); // Ensure no further code is executed after the redirect
            }
        }
    } else {
        echo "NO record found";
    }

    mysqli_close($conn);
}

?>

