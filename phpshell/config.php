; <?php die('Forbidden'); ?>
;  prevents this file from being downloaded.


[users]

;   username = "password"
; please use pwhash.php script to generate a hashed password
tony="sha1:e7ad2c2:6e212c9a5dbf3d0203abe513f1c97dd03270cfbe"
teli = "sha1:5d5a879f:89a74abae7c90e6c963f5d84051b798042ddec54"

[aliases]

ls = "ls -CvhF"
ll = "ls -lvhF"


[settings]

; change the root directory
home-directory = "home"

; Safe Mode warning.  PHP Shell will normally display a big, fat
; warning if it detects that PHP is running in Safe Mode.  If you find
; that PHP Shell works anyway, then set this to false to get rid of
; the warning.

safe-mode-warning = true

; Prompt string $PS1 ($PS2, $PS3 and $PS4 can not occur when using phpshell, 
; since commands are non-interacive!)

PS1 = "$AODF> "

; Enable File upload
file-upload = true

