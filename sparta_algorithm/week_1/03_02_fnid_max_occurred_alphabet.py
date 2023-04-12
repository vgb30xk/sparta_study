input = "hello my name is sparta"


def find_max_occurred_alphabet(string):
    alphabet_occurrence_array = [0] * 26
    j = 0
    i = 0
    max = 0

    for char in string:
        if char.isalpha():
            alphabet_occurrence_array[ord(char) - 97] += 1

    for num in alphabet_occurrence_array:
        if num > max:
            max = num
            j = i
        i += 1

    return chr(j+97)


result = find_max_occurred_alphabet(input)
print(result)
