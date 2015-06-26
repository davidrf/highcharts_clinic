class CreateLaunchVotes < ActiveRecord::Migration
  def change
    create_table :launch_votes do |t|
      t.string :name, null: false
      t.string :description, null: false
    end
  end
end
