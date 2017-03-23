import re

# count1 是含有数字7的个数
count1 = 0

# count2 是数字7出现的次数
count2 = 0

for i in range(10000):
    has_seven = re.findall(r'7', str(i))
    if has_seven:
        count1 += 1
        count2 += len(has_seven)

print(count1)
print(count2)