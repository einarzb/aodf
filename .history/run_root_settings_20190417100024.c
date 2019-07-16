
//  chmod 4755 run_root_settings

#include <stdlib.h>
#include <unistd.h>
#include <stdio.h>
#include <fcntl.h>
#include <linux/limits.h>

int main(int argc, char **argv)
{
  char commandType[100];
  

  if(setuid(0)){
      printf("not root");
      return -1; 
  }

  if(argc != 3){
    printf("Wrong params number...");
    return -1; 
  }
  strcpy(commandType,argv[1]);

  switch (commandType])
  {
    case /* constant-expression */:
      /* code */
      break;
  
    default:
      break;
  }
  FILE *fp;
  int status;
  char line[100];
  strcpy(line,argv[2]);

  fp = fopen("/etc/hostname", "w");
  fprintf(fp,"%s",&line[0]);
  fclose(fp);

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
