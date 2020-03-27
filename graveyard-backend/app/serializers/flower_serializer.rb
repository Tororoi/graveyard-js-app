class FlowerSerializer < ActiveModel::Serializer
  attributes :id, :name, :worth
  belongs_to :grave
end
