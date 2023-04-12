input = 20


def find_prime_list_under_number(number):
    prime = []
    for num in range(1, number+1):
        count = 0
        for i in range(1, num+1):
            if num % i == 0:
                count += 1
        if count == 2:
            prime.append(num)
    return prime


result = find_prime_list_under_number(input)
print(result)
