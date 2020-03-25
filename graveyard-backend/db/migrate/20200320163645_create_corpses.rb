class CreateCorpses < ActiveRecord::Migration[6.0]
  def change
    create_table :corpses do |t|
      t.string :name
      t.float :speed
      t.integer :flowers_needed
      t.belongs_to :grave, null: false, foreign_key: true

      t.timestamps
    end
  end
end
