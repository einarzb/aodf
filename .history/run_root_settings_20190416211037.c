#include <stdlib.h>
#include <unistd.h>
#include <stdio.h>

int main(int argc, char **argv)
{

  if(setuid(0))
    return -1;
  char * echox =argv[2];
  char command[128];

   strcpy( command, "echo 'lalalkkki' > /etc/hostname" );

   return system(command);
  // strcat(echox," > /etc/hostname");
  // printf(commmand);
  // return execl("/bin/bash","-c",echox,(char *)NULL);
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
