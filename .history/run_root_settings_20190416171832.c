#include <stdlib.h>
#include <unistd.h>
#include <stdio.h>

int main(int argc, char **argv)
{
  // if(setuid(0))
  //   return -1;

 switch(argc)
 {
    case 1: return execl("/usr/sbin/fw_printenv", "fw_printenv", (char *)NULL);
    case 2:
      switch(atoi(argv[1]))
      {
         case 1:
          printf(argv[1]);
           
           return 1;//execl("/usr/sbin/opkg", "opkg", "list-installed", (char *)NULL);
         case 2:
          printf(argv[1]);
          return 0;
          //  return execl("/usr/sbin/opkg", "opkg", "list-changed-conffiles", (char *)NULL);
	 case 3: 
	   return execl("/usr/sbin/opkg", "opkg", "update",(char *)NULL);
	 case 4: 
	   return execl("/usr/sbin/opkg", "opkg", "upgrade", (char *)NULL);
      }
 }
 return -1;
}
