from types import MethodType

class Health():
    weight = 89
    bloodGroup = 'B+'

    def __init__(self, name):
        self.name = name

    def play(self):
        print("Come on, lets play",self.name)

H = Health("Gurnoor")
#H.play = MethodType(play, H)

H.play()
print(getattr(H,weight))