class CreateGraves < ActiveRecord::Migration[6.0]
  def change
    create_table :graves do |t|
      t.string :name
      t.string :epitaph
      t.string :lifespan

      t.timestamps
    end
  end
end
