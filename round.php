<?php
function LoadGIF($imgname)
{
    /* Attempt to open */
    $im = @imagecreatefromgif($imgname);

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

$imagePath=$_SERVER['DOCUMENT_ROOT'].'/images/round.gif';
header('Content-Type: image/jpeg');
$img = LoadGIF($imagePath);
if(isset ($_GET['angle'])&&!empty ($_GET['angle']))
{
    $imageSize=getimagesize($imagePath);
    $color = imagecolorallocate($img,0xFF,0x00,0x00);
    $imageSize['angle_deg']=$_GET['angle'];
    $imageSize['angle_rad']=pi()*$_GET['angle']/180.0;
    $imageSize['x_origin']=round($imageSize[0]/2);
    $imageSize['y_origin']=round($imageSize[1]/2);
    $imageSize['radius']=min(array($imageSize['x_origin'], $imageSize['y_origin']));
    $x1=$imageSize['x_origin'];
    $y1=$imageSize['y_origin'];
    $x2=$imageSize['x_origin']+round($imageSize['radius']*cos($imageSize['angle_rad']));
    $y2=$imageSize['y_origin']-round($imageSize['radius']*sin($imageSize['angle_rad']));

    imageline($img, $x1, $y1, $x2, $y2,$color);
}
imagejpeg($img);
imagedestroy($img);
?>
