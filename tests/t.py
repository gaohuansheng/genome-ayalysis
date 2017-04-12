
# di_pairs = [(1,3),(3,2),(2,5),(4,5),(5,1),
#             (6,2),(7,3),
#             (11,12),(12,13),(13,14),
#             (21,22),(22,21)]
# di_pairs = dict(di_pairs)
# from collections import Counter
# def merged_blastn(input_dict):
#     loops = []
#     loop_items = []
#     segaments = {}
#     for key in input_dict:
#         try:
#             input_dict[key]
#             input_dict[input_dict[key]]
#             segaments[key] = [input_dict[key],input_dict[input_dict[key]]]
#         except:
#             pass
#     for key in segaments:
#         if key not in loop_items:
#             v = segaments[key][::]
#             while key not in v:
#                 if v[-2] not in segaments:
#                     break
#                 else:
#                     if Counter(v)[segaments[v[-2]][0]] == Counter(v)[segaments[v[-2]][1]] == 2:
#                         break
#                     v += segaments[v[-2]]
#             if 1 in Counter(Counter(v).values()):
#                 if Counter(Counter(v).values())[1] == 2:
#                     start , end = [_k for _k,_v in Counter(v).items() if _v ==1]
#                     if ((start,end) in input_dict.items() or (end,start) in input_dict.items()) and (start in input_dict and end in input_dict):
#                         loop_items+=list(set(v))
#                         loops.append(list(set(v)))
#         else:
#             continue
#     return loops
#
# loop = merged_blastn(di_pairs)
# print(loop)


def findMaxDivision(A, n):
    # write code here
    arr = []
    A = list(set(A))
    print(A)
    for i in range(len(arr)-1):
        arr.append(A[i+1]-A[i])
    return max(arr)

print(findMaxDivision([2,3,2,8,5,3,4],7))