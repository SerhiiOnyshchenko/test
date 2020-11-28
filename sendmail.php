<?php
   use PHPMailer\PHPMailer\PHPMailer;
   use PHPMailer\PHPMailer\Exception;

   require 'phpmailer/src/Exception.php';
   require 'phpmailer/src/PHPMailer.php';

   $mail = new PHPMailer(true);
   $mail->CharSet = 'UTF-8';
   $mail->setLanguage('ru','phpmailer/language/');
   $mail->IsHTML(true);
   
   //от кого письмо
   $mail->setForm('VKHellboy@gmail.com',"получилося!!");
   //кому
   $mail->addAddress('VKHellboy@gmail.com');
   //Тема
   $mail->Subjact = "Фильтри";

   //Тело письма
   if (trim(!empty($_POST['code']))) {
      $body.='<p><strong>Code:</strong> '.$_POST['code'].'</p>';
   }
   if (trim(!empty($_POST['name']))) {
      $body.='<p><strong>Name:</strong> '.$_POST['name'].'</p>';
   }
   if (trim(!empty($_POST['phone']))) {
      $body.='<p><strong>Phone:</strong> '.$_POST['phone'].'</p>';
   }
   //File
   if (!empty($_FILES['image']['tmp_name'])) {
      //путь файла
      $filePach=__DIR__."/files".$_FILES['image']['name'];
      //грузим файл
      if (copy($_FILES['image']['tmp_name'],$filePach)){
         $fileAttach = $filePach;
         $body.='<p><strong>Phone:</strong></p>';
         $mail->addAttachment($fileAttach);
      }
   }

   $mail->Body = $body;

   //отправяем
   if(!$mail->send()){
      $message='Ошибка';
   }else{
      $message='Данные отправлены!';
   }

   $response = ['message' => $message];

   header('Content-type: application/json');
   echo json_encode($response);
?>