<?php
function LoadJPEG($imgname)
{
    /* Attempt to open */
    $im = @imagecreatefromjpeg($imgname);

    /* See if it failed */
    if(!$im)
    {
        /* Create a blank image */
        $im = imagecreatetruecolor(150, 30);
        $bgc = imagecolorallocate($im, 255, 255, 255);
        $tc = imagecolorallocate($im, 0, 0, 0);

        imagefilledrectangle($im, 0, 0, 150, 30, $bgc);

        /* Output an error message */
        imagestring($im, 1, 5, 5, 'Error loading ' . $imgname, $tc);
    }

    return $im;
}

$imagePath=$_SERVER['DOCUMENT_ROOT'].'/images/bar.jpg';
header('Content-Type: image/jpeg');
$img = LoadJPEG($imagePath);
if(isset ($_GET['percent'])&&!empty ($_GET['percent']))
{
    $imageSize=getimagesize($imagePath);
    $color = imagecolorallocate($img,0xFF,0x00,0x00);
    $x1=0;
    $x2=$imageSize[0];
    $y1=$imageSize[1]-round($imageSize[1]*($_GET["percent"]/100));
    imagefilledrectangle($img, $x1, $y1-1, $x2-1, $y1+1,$color);
}
imagejpeg($img);
imagedestroy($img);
?>
