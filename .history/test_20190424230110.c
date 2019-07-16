#include <stddef.h>
#include <regex.h>    
#include <string.h>

#define DATE_LENGTH 12    
regex_t regex;
int reti;
char inputData[1024];

int main(int argc, char **argv)
{
    printf("Regex testing!\n--------\n");
    strcpy(inputData, "0101000019700");
    /* Compile regular expression */
    reti = regcomp(&regex, "[0-9]{12}", REG_EXTENDED);

    /* Execute regular expression */
    reti = regexec(&regex, &inputData, 0, NULL, 0);
    if (strlen(&inputData)!= DATE_LENGTH){
        printf("Wrong Length!\n");
        // exit(1);
    }else{
        printf("Right Length!\n");
    }

    if (!reti) {
        printf("Match");
    }
    else if (reti == REG_NOMATCH) {
        printf("No match");
    }
    else {

        printf("Regex match failed:\n");
        exit(1);
    }

    return 0;
}