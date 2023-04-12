input = "abcdcba"


def is_palindrome(string):
    for num in range(len(string)):
        if string[num] != string[len(string)-1-num]:
            return False
    return True


print(is_palindrome(input))