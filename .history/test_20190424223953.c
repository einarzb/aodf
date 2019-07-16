#include <stddef.h>
#include <regex.h>        
regex_t regex;
int reti;

int main(int argc, char **argv)
{
    printf("regex testing!");

    /* Compile regular expression */
    reti = regcomp(&regex, "[0-9][{12}]", 0);
    if (reti) {
        printf( "Could not compile regex\n");
        exit(1);
    }

    /* Execute regular expression */
    reti = regexec(&regex, "01010000197", 0, NULL, 0);
    if (!reti) {
        printf("Match");
    }
    else if (reti == REG_NOMATCH) {
        printf("No match");
    }
    else {
        // regerror(reti, &regex, msgbuf, sizeof(msgbuf));
        printf("Regex match failed:\n");
        exit(1);
    }

    return 0;
}