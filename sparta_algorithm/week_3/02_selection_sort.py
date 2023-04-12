input = [4, 6, 2, 9, 1]


def selection_sort(array):
    for i in range(len(array) - 1):
        min_index = i
        for j in range(len(array) - i):
            if array[i + j] < array[min_index]:
                min_index = i + j
            array[i], array[min_index] = array[min_index], array[i]
    return


selection_sort(input)
print(input)  # [1, 2, 4, 6, 9] 가 되어야 합니다!

