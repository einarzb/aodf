
//  chmod 4755 run_root_settings
#include <string.h>
#include <stdlib.h>
#include <unistd.h>
#include <stdio.h>
#include <fcntl.h>
#define COMMAND_HOSTNAME 1
#define COMMAND_REPO_IP 2
#define COMMAND_NTP_ADDRESS 3
#define COMMAND_EMS_CUSTOMER_ID 4
#define COMMAND_INTERFACES 5
#define COMMAND_REBOOT 6
#define COMMAND_REBOOT_FLAG_ON 7
#define COMMAND_REBOOT_FLAG_OFF 8
#define COMMAND_GET_REBOOT_FLAG 9
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
  char inputData[1024];
  int commandType;

  if(setuid(0)){
      printf("not root");
      // return -1; 
  }

  // if(argc != 3){
  //   printf("Wrong params number...");
  //   return -1; 
  // }
  // strcpy(commandType,argv[1]);
  commandType = atoi(argv[1]);
  if(argc >= 3){
    strcpy(inputData,argv[2]);
  }
  // printf();
  switch (commandType)
  {
    case COMMAND_HOSTNAME:
      return writeToConfFile("/etc/hostname", inputData);
    case COMMAND_REPO_IP:      
      return writeToConfFile("/etc/hosts", inputData);  
    case COMMAND_NTP_ADDRESS:
      return writeToConfFile("/etc/default/ntpdate", inputData);  
    case COMMAND_EMS_CUSTOMER_ID:
      return writeToConfFile("/usr/share/aodf-web/root/aodf_config.json", inputData);  
    case COMMAND_INTERFACES:
      return writeToConfFile("/etc/network/interfaces", inputData);    
    case COMMAND_REBOOT:  
      strcpy(inputData,"reboot");
      return execl(inputData,(char *)NULL);
    case COMMAND_REBOOT_FLAG_ON:  
      strcpy(inputData,"1");
      return writeToConfFile("/etc/aodfrneeded", inputData);   
    case COMMAND_REBOOT_FLAG_OFF:  
      strcpy(inputData,"0");
      return writeToConfFile("/etc/aodfrneeded", inputData);    
    case COMMAND_GET_REBOOT_FLAG:  
      strcpy(inputData,"cat /etc/aodfrneeded");
      return execl(inputData,(char *)NULL);
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