#include <stddef.h>
#include <regex.h>        
regex_t regex;
int reti;
char inputData;
int main(int argc, char **argv)
{
    printf("regex testing!");
    str_cpy(inputData, "010100001970");
    /* Compile regular expression */
    reti = regcomp(&regex, "[0-9]{12}", REG_EXTENDED);

    /* Execute regular expression */
    reti = regexec(&regex, inputData, 0, NULL, 0);
    if (strlen(&inputData)!== 12){
        printf("Wrong Length!");
        exit(1);
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