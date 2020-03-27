class GraveSerializer < ActiveModel::Serializer
  attributes :id, :name, :epitaph, :lifespan, :open
  has_many :corpses
  has_many :flowers
end
