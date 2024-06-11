from types import MethodType

class Health():
    weight = 89
    bloodGroup = 'B+'

    def __init__(self, name):
        self.name = name

def play():
    print("Come on, lets play")

H = Health("Gurnoor")
H.play = MethodType(play, H)
H.play()