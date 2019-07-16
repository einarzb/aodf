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

$imagePath=$_SERVER['DOCUMENT_ROOT'].'/images/hbar.jpg';
header('Content-Type: image/jpeg');
$img = LoadJPEG($imagePath);
if(isset ($_GET['percent'])&&!empty ($_GET['percent']))
{
    $imageSize=getimagesize($imagePath);
    $color = imagecolorallocate($img,0xFF,0x00,0x00);
    $y1=0;
    $y2=$imageSize[1];
    $center=round($imageSize[0]/2);
    $cdelta=round($imageSize[0]*($_GET["percent"]/200));
    $x1=$center-$cdelta;
    imagefilledrectangle($img, $x1-1, $y1, $x1+1, $y2,$color);
    $x1=$center+$cdelta;
    imagefilledrectangle($img, $x1-1, $y1, $x1+1, $y2,$color);
}
imagejpeg($img);
imagedestroy($img);
?>
