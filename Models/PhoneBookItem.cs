using System.ComponentModel.DataAnnotations;

namespace TechTest.PhoneBook.Models
{
    /// <summary>
    /// Model for a phone book item
    /// </summary>
    public class PhoneBookItem
    {
        /// <summary>
        /// Gets or sets the ID.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Gets or sets the name.
        /// </summary>
        [Required(ErrorMessage = "Name is required")]
        public string? Name { get; set; }

        /// <summary>
        /// Gets or sets the phone number.
        /// </summary>
        [Required(ErrorMessage = "Msisdn is required")]
        public string? Msisdn { get; set; }
    }
}