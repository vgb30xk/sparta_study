input = "aaawalaaddddeawedddddd"


def find_not_repeating_character(string):
    alphabet_occurrence_array = [0] * 26
    i = 0
    for str in string:
        if str.isalpha():
            alphabet_occurrence_array[ord(str) - 97] += 1

    for notre in string:
        if alphabet_occurrence_array[ord(notre) - 97] == 1:
            return string[i]
        else:
            i += 1

    return '-'


result = find_not_repeating_character(input)
print(result)
