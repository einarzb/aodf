#include <stdlib.h>
#include <unistd.h>
#include <stdio.h>
#include <fcntl.h>
#include <linux/limits.h>

int main(int argc, char **argv)
{

  if(setuid(0))
    return -1;

  FILE *fp;
int status;
char path[PATH_MAX];


fp = popen("ls *", "r");
if (fp == NULL)
    /* Handle error */;


while (fgets(path, PATH_MAX, fp) != NULL)
    printf("%s", path);


status = pclose(fp);
if (status == -1) {
    /* Error reported by pclose() */
    ...
} else {
    /* Use macros described under wait() to inspect `status' in order
       to determine success/failure of command executed by popen() */
    ...
}  
  // char * echox =argv[2];
  // char command[128];
  // int fd = open("/etc/hostname", O_WRONLY);
  // dup2(fd, 1);  // redirect stdout
  //  strcpy( command, "lalalkkki > /etc/hostname" );

  // //  return system(command);
  // // strcat(echox," > /etc/hostname");
  // // printf(commmand);
  // return popen(command);
  // return execl("/bin/bash", "echo", command,(char *)NULL);
//  switch(argc)
//  {
//     case 1: return execl("/usr/sbin/fw_printenv", "fw_printenv", (char *)NULL);

// 	 case 3: 
// 	   switch(atoi(argv[1]))
//       {
//          case 1:
         
//           echoCommand = "                         ";
//            strcat(echoCommand, argv[2]);
//            strcat(echoCommand," > /etc/hostname");
//            return execl("echo", echoCommand, (char *)NULL);
//          case 2:
//           printf(argv[1]);
//           return 0;
//           //  return execl("/usr/sbin/opkg", "opkg", "list-changed-conffiles", (char *)NULL);
// 	 case 4: 
// 	   return execl("/usr/sbin/opkg", "opkg", "upgrade", (char *)NULL);
//       }
//  }

 return -1;
}
