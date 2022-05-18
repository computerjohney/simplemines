from operator import truediv
from tkinter import Button
import random
import settings

class Cell:
  
  # class attribute contains instances
  all = []

  #constructor, defaults
  def __init__(self,x,y, is_mine=False):
    self.is_mine = is_mine
    self.cell_btn_object = None  
    self.x = x
    self.y = y
    # append it to all list (access class attribute by Cell.)
    Cell.all.append(self)

  # instance method...
  # self for instance methods
  def create_btn_object(self, location):
    btn = Button(
      location,
      width=12,
      height=4,
      #text = f'{self.x},{self.y}'
    )
    #<Button-1> for left click in tkinter 
    btn.bind('<Button-1>', self.left_click_actions)
    #right click
    btn.bind('<Button-3>', self.right_click_actions)
    self.cell_btn_object = btn

  #event stuff
  def left_click_actions(self, event):
    print(event)
    print("I am left clicked")
    if self.is_mine:
      self.show_mine()
    else:
      self.show_cell()

  def get_cell_by_axis(self, x,y):
    #return a cell object based on value of x,y
    for cell in Cell.all:
      if cell.x == x and cell.y == y:
        return cell

  # property representing the surrounded cells object
  # property is like an attribute that is read-only
  @property
  def surrounded_cells(self):
    cells = [
      self.get_cell_by_axis(self.x - 1, self.y - 1),
      self.get_cell_by_axis(self.x - 1, self.y),
      self.get_cell_by_axis(self.x - 1, self.y + 1),
      self.get_cell_by_axis(self.x, self.y - 1),
      self.get_cell_by_axis(self.x + 1, self.y - 1),
      self.get_cell_by_axis(self.x + 1, self.y),
      self.get_cell_by_axis(self.x + 1, self.y + 1),
      self.get_cell_by_axis(self.x, self.y + 1)
    ]
    #print(surrounded_cells)
    #use list comprehension...
    cells = [cell for cell in cells if cell is not None]
    return cells


  def show_cell(self):
    #print(self.get_cell_by_axis(0,0))
    print(self.surrounded_cells)
    

  def show_mine(self):
    #interrupt game, exits
    self.cell_btn_object.configure(bg='red')



  def right_click_actions(self, event):
    print(event)
    print("I am right clicked")
     

  #static - belongs to whole class
  @staticmethod
  def randomize_mines():
    #pass  # ignores it so can debug
    picked_cells = random.sample(
      Cell.all, settings.MINES_COUNT
    )
    #print(picked_cells)
    for picked_cell in picked_cells:
      picked_cell.is_mine = True

  #magic method displays stuff
  def __repr__(self):
    return f"Cell({self.x},{self.y})"