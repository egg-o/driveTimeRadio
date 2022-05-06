import pygame

pygame.init()
pygame.joystick.init()

xboxController = pygame.joystick.Joystick(0)
xboxController.init()
print(xboxController.get_name())
print("Axes", (xboxController.get_numaxes()))
print("Balls", xboxController.get_numballs())
print("Buttons", xboxController.get_numbuttons())
print("Hats", xboxController.get_numhats())
if xboxController.get_init() == True: print("Initialized properly")

while True:
    for event in pygame.event.get():
        if event.type == pygame.JOYBUTTONDOWN:
            print("PRES,  ", event)
        if event.type == pygame.JOYAXISMOTION:
            if (xboxController.get_axis(1) < -0.5):
                print("FORWARD")
        # if event.type == pygame.
    
