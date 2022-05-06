from playsound import playsound
import keyboard 
import pygame

#drums from https://www.youtube.com/watch?v=tfIeJigRWzk
#cymatics

pygame.init()
pygame.joystick.init()

usingKeyboard = False

xboxController = pygame.joystick.Joystick(0)
xboxController.init()
print(xboxController.get_name())
print("Axes", (xboxController.get_numaxes()))
print("Balls", xboxController.get_numballs())
print("Buttons", xboxController.get_numbuttons())
print("Hats", xboxController.get_numhats())
if xboxController.get_init() == True: print("Initialized properly")

pygame.mixer.init()
pygame.mixer.set_num_channels(10)
drumChannel = pygame.mixer.Channel(0)
pianoChannel = pygame.mixer.Channel(1)
bassChannel = pygame.mixer.Channel(2)
fxChannel = pygame.mixer.Channel(3)
chordChannel = pygame.mixer.Channel(4)
harpChannel = pygame.mixer.Channel(5)

d1 = pygame.mixer.Sound(r'C:\Users\zhong\Documents\2022\desenv\model-car-sound\Pdrum1.mp3')
d2 = pygame.mixer.Sound(r'C:\Users\zhong\Documents\2022\desenv\model-car-sound\Pdrum2.mp3')
d3 = pygame.mixer.Sound(r'C:\Users\zhong\Documents\2022\desenv\model-car-sound\percussion80.mp3')

p1 = pygame.mixer.Sound(r'C:\Users\zhong\Documents\2022\desenv\model-car-sound\Ppiano1.mp3')
p2 = pygame.mixer.Sound(r'C:\Users\zhong\Documents\2022\desenv\model-car-sound\Ppiano2.mp3')
p3 = pygame.mixer.Sound(r'C:\Users\zhong\Documents\2022\desenv\model-car-sound\Ppiano3.mp3')
p4 = pygame.mixer.Sound(r'C:\Users\zhong\Documents\2022\desenv\model-car-sound\ePiano80.mp3')
p5 = pygame.mixer.Sound(r'C:\Users\zhong\Documents\2022\desenv\model-car-sound\Ppiano5.mp3')

b1 = pygame.mixer.Sound(r'C:\Users\zhong\Documents\2022\desenv\model-car-sound\Pbass1.mp3')
b2 = pygame.mixer.Sound(r'C:\Users\zhong\Documents\2022\desenv\model-car-sound\Pbass2.mp3')
b3 = pygame.mixer.Sound(r'C:\Users\zhong\Documents\2022\desenv\model-car-sound\Pbass3.mp3')
b4 = pygame.mixer.Sound(r'C:\Users\zhong\Documents\2022\desenv\model-car-sound\Pbass4.mp3')
b5 = pygame.mixer.Sound(r'C:\Users\zhong\Documents\2022\desenv\model-car-sound\Pbass5.mp3')
b2.set_volume(0.3)

h1 =  pygame.mixer.Sound(r'C:\Users\zhong\Documents\2022\desenv\model-car-sound\Pharp1.mp3')
h2 =  pygame.mixer.Sound(r'C:\Users\zhong\Documents\2022\desenv\model-car-sound\Pharp2.mp3')
h1.set_volume(0.5)
h2.set_volume(0.5)

fx1 = pygame.mixer.Sound(r'C:\Users\zhong\Documents\2022\desenv\model-car-sound\fx-fire.mp3')
fx2 = pygame.mixer.Sound(r'C:\Users\zhong\Documents\2022\desenv\model-car-sound\fx-jungle.mp3')
fx3 = pygame.mixer.Sound(r'C:\Users\zhong\Documents\2022\desenv\model-car-sound\fx-wind.mp3')

chord1= pygame.mixer.Sound(r'C:\Users\zhong\Documents\2022\desenv\model-car-sound\percussion90.mp3')
chord2= pygame.mixer.Sound(r'C:\Users\zhong\Documents\2022\desenv\model-car-sound\percussion90b.mp3')
chord3= pygame.mixer.Sound(r'C:\Users\zhong\Documents\2022\desenv\model-car-sound\tapeHiss.mp3')
chord4= pygame.mixer.Sound(r'C:\Users\zhong\Documents\2022\desenv\model-car-sound\fill90.mp3')
chord5= pygame.mixer.Sound(r'C:\Users\zhong\Documents\2022\desenv\model-car-sound\chord-E.mp3')
chord6= pygame.mixer.Sound(r'C:\Users\zhong\Documents\2022\desenv\model-car-sound\chord-Fs.mp3')

fx1.set_volume(0.2)
fx2.set_volume(0.1)
fx3.set_volume(0.2)
currIns = 1 #1 is drum, 2 is piano, 3 is bass, 4 is fxjxvzzzoio
drumBeats = [d1, d2, d3]
pianoMels = [p1, p2, p3, p4, p5]
bassMels = [b1, b2, b3, b4, b5]
harpMels = [h1, h2]

drumInd, pianoInd, bassInd, harpInd = 0,0,0,0
#plopplkkkikiikisdfsd
while True:
    if (usingKeyboard == False): 
        events2 = pygame.event.get()
        for event in events2:
            if event.type == pygame.JOYBUTTONDOWN:
                print("PRES,  ", event)
                if event.button == 5: # A - instrumentadaaad change
                    currIns += 1
                    if (currIns > 4):
                        currIns = 1
                    if (currIns == 1): 
                        print("drums")
                    elif (currIns == 2) :
                        print("piano")
                    elif (currIns == 3) :
                        print("bass")
                    elif (currIns == 4) :
                        print("harp")    
                if event.button == 4: # A - instrumentadaaad change
                    currIns -= 1
                    if (currIns < 1):
                        currIns = 4
                    if (currIns == 1): 
                        print("drums")
                    elif (currIns == 2) :
                        print("piano")
                    elif (currIns == 3) :
                        print("bass")
                    elif (currIns == 4) :
                        print("harp")          
                if event.button == 0: # S -  switch melody
                    if (currIns == 1) : 
                        drumInd += 1
                        if (drumInd >= len(drumBeats)):
                            drumInd = 0
                        print("drumInd: " + str(drumInd))
                    elif (currIns == 2) : 
                        pianoInd += 1
                        if (pianoInd >= len(pianoMels)):
                            pianoInd = 0
                        print("pianoInd: " + str(pianoInd))
                    elif (currIns == 3) : 
                        bassInd += 1
                        if (bassInd >= len(bassMels)):
                            bassInd = 0
                        print("bassInd: " + str(bassInd))   
                    elif (currIns == 4) : 
                        harpInd += 1
                        if (harpInd >= len(harpMels)):
                            harpInd = 0
                        print("harpInd: " + str(harpInd))                   
                if event.button == 1: # D - play
                    if (currIns == 1): 
                        #drumBeats[drumInd].set_volume(1)
                        drumChannel.play(drumBeats[drumInd], loops = -1)
                    elif (currIns == 2) :
                        # pianoMels[pianoInd].set_volume(1)
                        pianoChannel.play(pianoMels[pianoInd], loops = -1)
                    elif (currIns == 3) :
                        # bassMels[bassInd].set_volume(1)
                        bassChannel.play(bassMels[bassInd], loops = -1)
                    elif (currIns == 4) :
                        # harpMels[harpInd].set_volume(1)  
                        harpChannel.play(harpMels[harpInd], loops = -1)
                    print("playing")
                if event.button == 3: # F - pause
                    if (currIns == 1): 
                        # drumBeats[drumInd].set_volume(0)
                        drumChannel.stop()
                    elif (currIns == 2) :
                        # pianoMels[pianoInd].set_volume(0)
                        pianoChannel.stop()
                    elif (currIns == 3) :
                        # bassMels[bassInd].set_volume(0)
                        bassChannel.stop()      
                    elif (currIns == 4) :
                        # harpMels[harpInd].set_volume(0)                
                        harpChannel.stop()         
                    print("pausing")

                if event.button == 2:
                    event = keyboard.read_event()
                    if event.event_type == keyboard.KEY_DOWN:
                        if event.name == 'z':
                            fxChannel.play(fx1, loops = -1)
                            print("playing fire")
                        if event.name == 'x':
                            fxChannel.play(fx2, loops = -1)
                            print("playing jungle")
                        if event.name == 'c':
                            fxChannel.play(fx3, loops = -1)
                            print("playing wind")
                        if event.name == 'v':
                            fxChannel.stop()
                            print("stopping ambi")

                        #bassChordsxoiiiiiivjp
                        if event.name == 'i':
                            chordChannel.play(chord1)
                        if event.name == 'o':
                            chordChannel.play(chord2)
                        if event.name == 'p':
                            chordChannel.play(chord3)
                        if event.name == 'j':
                            chordChannel.play(chord4)
                        if event.name == 'k':
                            chordChannel.play(chord5)
                        if event.name == 'l':
                            chordChannel.play(chord6)

    else:
        # Wait for the next event.
        event = keyboard.read_event()
        # event2 = pygame.event.get()
        if event.event_type == keyboard.KEY_DOWN:
            if event.name == 'a' or event.name == 'right': # A - instrumentadaaad change
                currIns += 1
                if (currIns > 4):
                    currIns = 1
                if (currIns == 1): 
                    print("drums")
                elif (currIns == 2) :
                    print("piano")
                elif (currIns == 3) :
                    print("bass")
                elif (currIns == 4) :
                    print("harp")      
            if event.name == 'left':
                currIns -= 1
                if (currIns <  1):
                    currIns = 4
                if (currIns == 1): 
                    print("drums")
                elif (currIns == 2) :
                    print("piano")
                elif (currIns == 3) :
                    print("bass")
                elif (currIns == 4) :
                    print("harp") 
            if event.name == 's' or event.name == 'space': # S -  switch melody
                if (currIns == 1) : 
                    drumInd += 1
                    if (drumInd >= len(drumBeats)):
                        drumInd = 0
                    print("drumInd: " + str(drumInd))
                elif (currIns == 2) : 
                    pianoInd += 1
                    if (pianoInd >= len(pianoMels)):
                        pianoInd = 0
                    print("pianoInd: " + str(pianoInd))
                elif (currIns == 3) : 
                    bassInd += 1
                    if (bassInd >= len(bassMels)):
                        bassInd = 0
                    print("bassInd: " + str(bassInd))   
                elif (currIns == 4) : 
                    harpInd += 1
                    if (harpInd >= len(harpMels)):
                        harpInd = 0
                    print("harpInd: " + str(harpInd))                   
            if event.name == 'd' or event.name == 'up': # D - play
                if (currIns == 1): 
                    #drumBeats[drumInd].set_volume(1)
                    drumChannel.play(drumBeats[drumInd], loops = -1)
                elif (currIns == 2) :
                    # pianoMels[pianoInd].set_volume(1)
                    pianoChannel.play(pianoMels[pianoInd], loops = -1)
                elif (currIns == 3) :
                    # bassMels[bassInd].set_volume(1)
                    bassChannel.play(bassMels[bassInd], loops = -1)
                elif (currIns == 4) :
                    # harpMels[harpInd].set_volume(1)  
                    harpChannel.play(harpMels[harpInd], loops = -1)
                print("playing")
            if event.name == 'f'or event.name == 'down': # F - pause
                if (currIns == 1): 
                    # drumBeats[drumInd].set_volume(0)
                    drumChannel.stop()
                elif (currIns == 2) :
                    # pianoMels[pianoInd].set_volume(0)
                    pianoChannel.stop()
                elif (currIns == 3) :
                    # bassMels[bassInd].set_volume(0)
                    bassChannel.stop()      
                elif (currIns == 4) :
                    # harpMels[harpInd].set_volume(0)                
                    harpChannel.stop()         
                print("pausing")
            if event.name == 'r': #full Stop
                print("full stop")
                break

            #FX
            if event.name == 'z':
                fxChannel.play(fx1, loops = -1)
                print("playing fire")
            if event.name == 'x':
                fxChannel.play(fx2, loops = -1)
                print("playing jungle")
            if event.name == 'c':
                fxChannel.play(fx3, loops = -1)
                print("playing wind")
            if event.name == 'v':
                fxChannel.stop()
                print("stopping ambi")

            #bassChords
            if event.name == 'i':
                chordChannel.play(chord1)
            if event.name == 'o':
                chordChannel.play(chord2)
            if event.name == 'p':
                chordChannel.play(chord3)
            if event.name == 'j':
                chordChannel.play(chord4)
            if event.name == 'k':
                chordChannel.play(chord5)
            if event.name == 'l':
                chordChannel.play(chord6)
    
    # for event in event2:
    #     if event.type == pygame.JOYBUTTONDOWN:
    #         print("PRES,  ", event)
    #         if event.button == 0: # A - instrumentadaaad change
    #             currIns += 1
    #             if (currIns > 4):
    #                 currIns = 1
    #             if (currIns == 1): 
    #                 print("drums")
    #             elif (currIns == 2) :
    #                 print("piano")
    #             elif (currIns == 3) :
    #                 print("bass")
    #             elif (currIns == 4) :
    #                 print("harp")            
    #         if event.button == 1: # S -  switch melody
    #             if (currIns == 1) : 
    #                 drumInd += 1
    #                 if (drumInd >= len(drumBeats)):
    #                     drumInd = 0
    #                 print("drumInd: " + str(drumInd))
    #             elif (currIns == 2) : 
    #                 pianoInd += 1
    #                 if (pianoInd >= len(pianoMels)):
    #                     pianoInd = 0
    #                 print("pianoInd: " + str(pianoInd))
    #             elif (currIns == 3) : 
    #                 bassInd += 1
    #                 if (bassInd >= len(bassMels)):
    #                     bassInd = 0
    #                 print("bassInd: " + str(bassInd))   
    #             elif (currIns == 4) : 
    #                 harpInd += 1
    #                 if (harpInd >= len(harpMels)):
    #                     harpInd = 0
    #                 print("harpInd: " + str(harpInd))                   
    #         if event.button == 2: # D - play
    #             if (currIns == 1): 
    #                 #drumBeats[drumInd].set_volume(1)
    #                 drumChannel.play(drumBeats[drumInd], loops = -1)
    #             elif (currIns == 2) :
    #                 # pianoMels[pianoInd].set_volume(1)
    #                 pianoChannel.play(pianoMels[pianoInd], loops = -1)
    #             elif (currIns == 3) :
    #                 # bassMels[bassInd].set_volume(1)
    #                 bassChannel.play(bassMels[bassInd], loops = -1)
    #             elif (currIns == 4) :
    #                 # harpMels[harpInd].set_volume(1)  
    #                 harpChannel.play(harpMels[harpInd], loops = -1)
    #             print("playing")
    #         if event.button == 3: # F - pause
    #             if (currIns == 1): 
    #                 # drumBeats[drumInd].set_volume(0)
    #                 drumChannel.stop()
    #             elif (currIns == 2) :
    #                 # pianoMels[pianoInd].set_volume(0)
    #                 pianoChannel.stop()
    #             elif (currIns == 3) :
    #                 # bassMels[bassInd].set_volume(0)
    #                 bassChannel.stop()      
    #             elif (currIns == 4) :
    #                 # harpMels[harpInd].set_volume(0)                
    #                 harpChannel.stop()         
    #             print("pausing")
    #         if event.name == 'r': #full Stop
    #             print("full stop")
    #             break
