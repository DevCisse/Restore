using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class Testing : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Address1",
                table: "UserAddress",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Address2",
                table: "UserAddress",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "UserAddress",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Country",
                table: "UserAddress",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FullName",
                table: "UserAddress",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "State",
                table: "UserAddress",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Zip",
                table: "UserAddress",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ItemOrdered_ProductId",
                table: "OrderItem",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "033ffc88-79b5-4f04-a17b-2dde7ee2acec");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "e981e843-b9e8-40cd-a4db-56ed90dbb9bb");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address1",
                table: "UserAddress");

            migrationBuilder.DropColumn(
                name: "Address2",
                table: "UserAddress");

            migrationBuilder.DropColumn(
                name: "City",
                table: "UserAddress");

            migrationBuilder.DropColumn(
                name: "Country",
                table: "UserAddress");

            migrationBuilder.DropColumn(
                name: "FullName",
                table: "UserAddress");

            migrationBuilder.DropColumn(
                name: "State",
                table: "UserAddress");

            migrationBuilder.DropColumn(
                name: "Zip",
                table: "UserAddress");

            migrationBuilder.AlterColumn<string>(
                name: "ItemOrdered_ProductId",
                table: "OrderItem",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "213d2a7d-f876-4497-b95d-1d7631dec161");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "ac9f1bc5-0d28-48f9-ba3c-14826337619a");
        }
    }
}
