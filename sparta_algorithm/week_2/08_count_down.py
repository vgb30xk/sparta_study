def count_down(number):
    print(number)
    if number is 0:  # number를 출력하고
        return
    count_down(number - 1)

    # count_down 함수를 number - 1 인자를 주고 다시 호출한다!


count_down(60)
