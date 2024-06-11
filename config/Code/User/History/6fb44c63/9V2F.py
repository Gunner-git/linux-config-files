class Player():
    def __init__(self, given_name):
        self.__name = given_name
        self.__score = 0

    
class Card():
    def __init__(self, given_suit,given_value,given_rank):
        self.__suit = given_suit
        self.__rank = given_rank
        self.__value = given_value

class Deck():
    def __init__(self):
        self.__cards=[]
        
        suits = ["hearts", "spades", "clubs", "diamonds"]
        ranks = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "jack", "queen", "king"]
        values = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10]

        for i in suits:
            for j in ranks:
                currentCard = Card(suits[i], ranks[j], values[j])
                self.__cards.append(currentCard)
        
    def shuffle():
        pass

    def deal():
        pass

playerName = input("Enter a player name: ")
Player1 = Player(playerName)
# print(Player1)


