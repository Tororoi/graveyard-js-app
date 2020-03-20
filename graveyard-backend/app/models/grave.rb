class Grave < ApplicationRecord
    has_many :corpses
    has_many :flowers
    
end
