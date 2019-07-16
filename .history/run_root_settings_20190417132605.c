
//  chmod 4755 run_root_settings
#include <string.h>
#include <stdlib.h>
#include <unistd.h>
#include <stdio.h>
#include <fcntl.h>
#define COMMAND_HOSTNAME 1
#define COMMAND_REPO_IP 2
// const char *HOS = "Howdy";

int writeToConfFile(char* filename, char* newConf) {

  FILE *fp;
  int status;
  // char line[100];
  // strcpy(line,inputData);

  // fp = fopen("/etc/hostname", "w");
  fp = fopen(filename, "w");
  fprintf(fp,"%s",&newConf[0]);
  status = fclose(fp);
  return status;
}


int main(int argc, char **argv)
{
  // char commandType[100];
  char inputData[1024];
  int commandType;

  if(setuid(0)){
      printf("not root");
      // return -1; 
  }

  if(argc != 3){
    printf("Wrong params number...");
    return -1; 
  }
  // strcpy(commandType,argv[1]);
  commandType = atoi(argv[1]);
  strcpy(inputData,argv[2]);
  switch (commandType)
  {
    case COMMAND_HOSTNAME:
      return writeToConfFile("/etc/hostname", inputData);
    case COMMAND_REPO_IP:
      return writeToConfFile("/etc/hostname", inputData);  
  
    default:
      printf("Unknown command!\n");
      break;
  }
  // sprintf("%i, %s", commandType,&inputData[0]);

 return -1;
}


//  char * echox =argv[2];
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