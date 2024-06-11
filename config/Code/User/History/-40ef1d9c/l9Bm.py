class Health():
    weight = 89
    bloodGroup = 'B+'

    def __init__(self, name):
        self.name = name

    def play(self):
        print("Come on, lets play")

H = Health("Gurnoor")
# H.play = play()
H.play()