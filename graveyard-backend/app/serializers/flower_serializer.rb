class FlowerSerializer < ActiveModel::Serializer
  attributes :id, :name
  belongs_to :grave
end
