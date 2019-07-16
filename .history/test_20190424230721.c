#include <stddef.h>
#include <regex.h>    
#include <string.h>

#define DATE_LENGTH 12    

char inputData[1024];



int validDateInput(char dateInput) {
  /* Compile regular expression */
    reti = regcomp(&regex, "[0-9]{12}", REG_EXTENDED);

    /* Execute regular expression */
    reti = regexec(&regex, &inputData, 0, NULL, 0);
    if (strlen(&inputData)!= DATE_LENGTH){
        printf("Wrong Length!\n");
        return 0;
    }

    if (!reti) {
        printf("Match");
        return 1;
    }
    else if (reti == REG_NOMATCH) {
        printf("No match");
        return 0;
    }
    else {

        printf("Regex match failed:\n");
        return 0;
    }
}

int main(int argc, char **argv)
{
    // printf("Regex testing!\n--------\n");
    strcpy(inputData, "010100001970");
    validDateInput(inputData);
}

