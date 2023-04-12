shop_menus = ["만두", "떡볶이", "오뎅", "사이다", "콜라"]
shop_orders = ["오뎅", "콜라", "만두"]


def is_available_to_order(menus, orders):
    for order in orders:
        count = 0
        for menu in menus:
            if menu == order:
                count += 1
        if count == 0:
            return "주문 불가"

    return "주문 가능"


result = is_available_to_order(shop_menus, shop_orders)
print(result)

