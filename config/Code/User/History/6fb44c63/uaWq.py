class Player():
    def __init__(self, name):
        self.__name = name
        self.__score = 0

    
class Card():
    def __init__(self, suit, rank, value):
        self.__suit = suit
        self.__rank = rank
        self.__value = value