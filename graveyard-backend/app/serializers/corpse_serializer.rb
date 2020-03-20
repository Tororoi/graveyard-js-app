class CorpseSerializer < ActiveModel::Serializer
  attributes :id, :name, :speed, :flowers_needed
  belongs_to :grave
end
