def change_limit(num: number, positive_direction: bool, diff: number, floor: number, ceiling: number):
    if positive_direction:
        num += diff
    else:
        num += -1 * diff
    num = keepWithinTheLimits(num, floor, ceiling)
    return num
def keepWithinTheLimits(num: number, min_value: number, max_value: number):
    if num < min_value:
        return min_value
    elif num > max_value:
        return max_value
    else:
        return num
count = 0
difference = 0
currentTime = 0
num = 0
startTime = input.running_time()
period = 1000
limit = 500
step = 1

def on_forever():
    global currentTime, difference, limit, count, startTime
    currentTime = input.running_time()
    if currentTime - startTime >= period:
        if input.button_is_pressed(Button.A):
            difference = step + 2 ** count
            limit = change_limit(limit, True, difference, 1, 1023)
            count += 1
        else:
            count = 0
        startTime = currentTime
        serial.write_value("count", count)
        serial.write_value("diff", difference)
    led.plot_bar_graph(500, limit)
basic.forever(on_forever)
